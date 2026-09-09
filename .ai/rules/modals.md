---
paths:
  - 'resources/js/components/modals/**'
---

# Modals

## Shared movie modal
Use MovieModal from resources/js/components/modals on the movies list and movie show pages. Pass variant store or update; update also needs movieId and form defaults. Do not keep a second movie form modal under pages/Movies or pages/Movie.

## Movie and quote modal folders
Movie modal lives in resources/js/components/modals/MovieModal. Quote modal lives in resources/js/components/modals/QuoteModal. Import MovieModal from MovieModal/MovieModal on the movies list and movie show pages. Do not keep a second movie form modal under pages/Movies or pages/Movie.
