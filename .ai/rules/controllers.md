---
paths:
  - app/Http/Controllers/MovieController.php
  - app/Http/Controllers/NewsFeedController.php
---

# Controllers

## Movie show includes quotes
MovieController@show eager-loads quotes.media, newest first. MovieResource includes quotes only via whenLoaded so the movies index does not load them.

## News feed lists every quote
NewsFeedController@index returns QuoteResource::collection of all quotes, eager-loaded with media, movie, and user, newest first. Do not scope the list to the current user.

## News feed loads likes and comments
NewsFeedController@index eager-loads comments.user (oldest first), withCount likes/comments, and withExists likes as liked for the current user. Do not scope the feed to the current user's quotes. QuoteResource exposes likes_count, comments_count, liked, and comments.
