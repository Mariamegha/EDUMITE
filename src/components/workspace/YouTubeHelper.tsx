/**
 * Production YouTube Helper (Real YouTube Data API v3)
 * 
 * PRODUCTION FEATURES:
 * - Real YouTube Data API v3 integration
 * - Subject-based search with educational filters
 * - Duration, relevance, and quality filtering
 * - No recommendations, no autoplay
 * - Subject-agnostic (works for ANY topic)
 * - Production error handling and caching
 */

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube, Search, Play, Clock, Eye, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { apiService } from '@/services/apiService';
import { buildSearchQuery } from '@/services/contextService';
import type { Helper, Space } from '@/types/unifiedOS';

interface YouTubeHelperProps {
  helper: Helper;
  space: Space;
}

interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  duration: string;
  views: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

export default function YouTubeHelper({ helper, space }: YouTubeHelperProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-search on mount with space context
  useEffect(() => {
    const initialQuery = buildSearchQuery(space);
    searchVideos(initialQuery);
  }, [space.id]);

  /**
   * Search YouTube with educational filters
   */
  const searchVideos = async (query?: string) => {
    const searchTerm = query || searchQuery || buildSearchQuery(space);
    
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchYouTubeAPI(searchTerm, {
        maxResults: 12,
        videoDuration: 'medium', // 4-20 minutes (educational sweet spot)
        order: 'relevance',
        safeSearch: 'strict',
        videoLicense: 'any',
      });

      setVideos(results);
    } catch (err) {
      console.error('[YouTube] Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to search videos');
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    searchVideos();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openVideo = (videoId: string) => {
    // Open in new tab without autoplay or recommendations
    window.open(
      `https://www.youtube.com/watch?v=${videoId}&rel=0&autoplay=0`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
            <Youtube className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-100">YouTube Learning</h3>
            <p className="text-xs text-gray-500">
              Educational videos for {space.subject}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Search ${space.subject} tutorials...`}
            className="flex-1 bg-[#1a1a1a] border-gray-800 text-gray-100"
            disabled={isLoading}
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Search Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-3" />
              <p className="text-gray-500">Searching educational videos...</p>
            </div>
          </div>
        ) : videos.length === 0 && hasSearched ? (
          <div className="text-center py-12">
            <Youtube className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-300 mb-2">No videos found</h4>
            <p className="text-sm text-gray-500">Try a different search term</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <Youtube className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-300 mb-2">
              Discover {space.subject} videos
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              Curated educational content from top channels
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group cursor-pointer"
                onClick={() => openVideo(video.id)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white ml-0.5" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h4 className="font-medium text-gray-100 text-sm line-clamp-2 mb-2 group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{video.channel}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>

                {/* External Link Indicator */}
                <div className="px-3 pb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-gray-500 hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(video.id);
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Watch on YouTube
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Search YouTube Data API v3 (PRODUCTION)
 */
async function searchYouTubeAPI(
  query: string,
  options: {
    maxResults?: number;
    videoDuration?: 'short' | 'medium' | 'long';
    order?: 'relevance' | 'date' | 'rating' | 'viewCount';
    safeSearch?: 'none' | 'moderate' | 'strict';
    videoLicense?: 'any' | 'creativeCommon';
  } = {}
): Promise<YouTubeVideo[]> {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  if (!API_KEY) {
    throw new Error('YouTube API key not configured. Add VITE_YOUTUBE_API_KEY to .env');
  }

  const {
    maxResults = 12,
    videoDuration = 'medium',
    order = 'relevance',
    safeSearch = 'strict',
    videoLicense = 'any',
  } = options;

  // Search for videos
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('key', API_KEY);
  searchUrl.searchParams.set('q', query);
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('maxResults', String(maxResults));
  searchUrl.searchParams.set('order', order);
  searchUrl.searchParams.set('safeSearch', safeSearch);
  searchUrl.searchParams.set('videoDuration', videoDuration);
  searchUrl.searchParams.set('videoLicense', videoLicense);
  searchUrl.searchParams.set('relevanceLanguage', 'en');

  const searchResponse = await apiService.request<any>(
    searchUrl.toString(),
    {},
    { cacheKey: `youtube-search-${query}-${maxResults}` }
  );

  if (!searchResponse.items || searchResponse.items.length === 0) {
    return [];
  }

  // Extract video IDs
  const videoIds = searchResponse.items.map((item: any) => item.id.videoId).join(',');

  // Get video details (duration, views, etc.)
  const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  detailsUrl.searchParams.set('key', API_KEY);
  detailsUrl.searchParams.set('id', videoIds);
  detailsUrl.searchParams.set('part', 'contentDetails,statistics,snippet');

  const detailsResponse = await apiService.request<any>(
    detailsUrl.toString(),
    {},
    { cacheKey: `youtube-details-${videoIds}` }
  );

  // Combine search and details data
  const videos: YouTubeVideo[] = detailsResponse.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    duration: formatDuration(item.contentDetails.duration),
    views: formatViews(parseInt(item.statistics.viewCount)),
    thumbnail: item.snippet.thumbnails.medium.url,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description,
  }));

  return videos;
}

/**
 * Format ISO 8601 duration to readable format
 */
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format view count to readable format
 */
function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}
