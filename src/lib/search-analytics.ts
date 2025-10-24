interface SearchEvent {
  query: string
  results: number
  timestamp: Date
  filters?: Record<string, unknown>
  sortBy?: string
  clickedResult?: string
  timeToFirstResult?: number
}

interface SearchAnalytics {
  totalSearches: number
  popularSearches: Array<{ query: string; count: number }>
  noResultsQueries: string[]
  averageResultsPerQuery: number
  searchAbandonmentRate: number
  clickThroughRate: number
  averageTimeToFirstResult: number
  topFilters: Record<string, number>
  topSortMethods: Record<string, number>
}

class SearchAnalyticsTracker {
  private events: SearchEvent[] = []
  private sessionStart: Date = new Date()
  
  // Track search event
  trackSearch(query: string, results: number, filters?: Record<string, unknown>, sortBy?: string) {
    const event: SearchEvent = {
      query,
      results,
      timestamp: new Date(),
      filters,
      sortBy
    }
    
    this.events.push(event)
    
    // Save to localStorage for persistence
    this.saveToLocalStorage()
  }
  
  // Track result click
  trackClick(query: string, resultId: string) {
    const event = this.events.find(e => e.query === query && !e.clickedResult)
    if (event) {
      event.clickedResult = resultId
    }
  }
  
  // Track time to first result
  trackTimeToFirstResult(query: string, timeMs: number) {
    const event = this.events.find(e => e.query === query && !e.timeToFirstResult)
    if (event) {
      event.timeToFirstResult = timeMs
    }
  }
  
  // Get analytics
  getAnalytics(): SearchAnalytics {
    
    // Popular searches
    const queryCounts = new Map<string, number>()
    this.events.forEach(event => {
      const count = queryCounts.get(event.query) || 0
      queryCounts.set(event.query, count + 1)
    })
    
    const popularSearches = Array.from(queryCounts.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
    
    // No results queries
    const noResultsQueries = this.events
      .filter(event => event.results === 0)
      .map(event => event.query)
      .filter((query, index, array) => array.indexOf(query) === index)
    
    // Average results per query
    const averageResultsPerQuery = this.events.length > 0 
      ? this.events.reduce((sum, event) => sum + event.results, 0) / this.events.length 
      : 0
    
    // Search abandonment rate
    const totalSearches = this.events.length
    const searchesWithClicks = this.events.filter(event => event.clickedResult).length
    const searchAbandonmentRate = totalSearches > 0 
      ? (totalSearches - searchesWithClicks) / totalSearches 
      : 0
    
    // Click through rate
    const clickThroughRate = totalSearches > 0 
      ? searchesWithClicks / totalSearches 
      : 0
    
    // Average time to first result
    const eventsWithTime = this.events.filter(event => event.timeToFirstResult)
    const averageTimeToFirstResult = eventsWithTime.length > 0
      ? eventsWithTime.reduce((sum, event) => sum + (event.timeToFirstResult || 0), 0) / eventsWithTime.length
      : 0
    
    // Top filters
    const filterCounts = new Map<string, number>()
    this.events.forEach(event => {
      if (event.filters) {
        Object.entries(event.filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            value.forEach(v => {
              const filterKey = `${key}:${v}`
              const count = filterCounts.get(filterKey) || 0
              filterCounts.set(filterKey, count + 1)
            })
          }
        })
      }
    })
    
    const topFilters = Object.fromEntries(
      Array.from(filterCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    )
    
    // Top sort methods
    const sortCounts = new Map<string, number>()
    this.events.forEach(event => {
      if (event.sortBy) {
        const count = sortCounts.get(event.sortBy) || 0
        sortCounts.set(event.sortBy, count + 1)
      }
    })
    
    const topSortMethods = Object.fromEntries(sortCounts.entries())
    
    return {
      totalSearches,
      popularSearches,
      noResultsQueries,
      averageResultsPerQuery,
      searchAbandonmentRate,
      clickThroughRate,
      averageTimeToFirstResult,
      topFilters,
      topSortMethods
    }
  }
  
  // Save to localStorage
  private saveToLocalStorage() {
    try {
      localStorage.setItem('search-analytics', JSON.stringify(this.events))
    } catch (error) {
      console.error('Failed to save search analytics:', error)
    }
  }
  
  // Load from localStorage
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('search-analytics')
      if (saved) {
        this.events = JSON.parse(saved).map((event: SearchEvent) => ({
          ...event,
          timestamp: new Date(event.timestamp)
        }))
      }
    } catch (error) {
      console.error('Failed to load search analytics:', error)
    }
  }
  
  // Clear analytics
  clearAnalytics() {
    this.events = []
    localStorage.removeItem('search-analytics')
  }
  
  // Export analytics
  exportAnalytics() {
    const analytics = this.getAnalytics()
    const dataStr = JSON.stringify(analytics, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'search-analytics.json'
    link.click()
    
    URL.revokeObjectURL(url)
  }
}

// Global analytics instance
export const searchAnalytics = new SearchAnalyticsTracker()

// Initialize analytics on load
if (typeof window !== 'undefined') {
  searchAnalytics.loadFromLocalStorage()
}

// Utility functions for tracking
export const trackSearch = (query: string, results: number, filters?: Record<string, unknown>, sortBy?: string) => {
  searchAnalytics.trackSearch(query, results, filters, sortBy)
}

export const trackClick = (query: string, resultId: string) => {
  searchAnalytics.trackClick(query, resultId)
}

export const trackTimeToFirstResult = (query: string, timeMs: number) => {
  searchAnalytics.trackTimeToFirstResult(query, timeMs)
}

export const getAnalytics = () => {
  return searchAnalytics.getAnalytics()
}

export const clearAnalytics = () => {
  searchAnalytics.clearAnalytics()
}

export const exportAnalytics = () => {
  searchAnalytics.exportAnalytics()
}
