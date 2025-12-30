import { useState, useEffect } from 'react';
import { Heart, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt: string;
}

function SocialShare({ title, url, excerpt }: SocialShareProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fullUrl = `https://profvjreddi.github.io${url}`;
  const storageKey = `blog-liked-${url}`;

  // Load like state from localStorage
  useEffect(() => {
    const liked = localStorage.getItem(storageKey) === 'true';
    setIsLiked(liked);
    
    // Fetch like count from CountAPI
    fetchLikeCount();
  }, [url]);

  const fetchLikeCount = async () => {
    try {
      // Using CountAPI.xyz - a free, simple counting API
      const namespace = 'vijaysankar-blog';
      const key = encodeURIComponent(url);
      const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
      const data = await response.json();
      setLikeCount(data.value || 0);
    } catch (error) {
      console.error('Failed to fetch like count:', error);
      // Silently fail - the like button will still work locally
    }
  };

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setIsAnimating(true);
    
    // Save to localStorage
    localStorage.setItem(storageKey, String(newLikedState));
    
    // Update count on server
    try {
      const namespace = 'vijaysankar-blog';
      const key = encodeURIComponent(url);
      const action = newLikedState ? 'hit' : 'get'; // 'hit' increments, 'get' just fetches
      
      if (newLikedState) {
        // Increment on server
        const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        const data = await response.json();
        setLikeCount(data.value);
      } else {
        // Decrement locally (CountAPI doesn't support decrement easily)
        setLikeCount(prev => Math.max(0, (prev || 0) - 1));
      }
    } catch (error) {
      console.error('Failed to update like count:', error);
    }
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleTwitterShare = () => {
    const text = `${title}\n\n${excerpt}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="border-t border-b border-gray-200 py-6 my-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Like Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isLiked
                ? 'bg-[#A51C30] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-200 ${
                isAnimating ? 'scale-125' : 'scale-100'
              } ${isLiked ? 'fill-current' : ''}`}
            />
            <span className="font-medium text-sm">
              {likeCount !== null ? likeCount : '—'}
            </span>
          </button>
          <span className="text-sm text-gray-500">
            {isLiked ? "You liked this post" : "Like this post"}
          </span>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Share:</span>
          
          <button
            onClick={handleTwitterShare}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-[#1DA1F2] hover:text-white transition-colors duration-200"
            aria-label="Share on Twitter"
            title="Share on Twitter"
          >
            <Twitter className="w-5 h-5" />
          </button>

          <button
            onClick={handleLinkedInShare}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-[#0077B5] hover:text-white transition-colors duration-200"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </button>

          <button
            onClick={handleCopyLink}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isCopied
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Copy link"
            title={isCopied ? 'Link copied!' : 'Copy link'}
          >
            {isCopied ? (
              <Check className="w-5 h-5" />
            ) : (
              <LinkIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialShare;

