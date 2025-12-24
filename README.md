# Breadcrumbs

Screenshot upload service.

## Directory Structure

Screenshots are stored in a 3-level hierarchy:

```
screenshots/55/550e/550e8400-e29b-41d4-a716-446655440000.png
```

## Environment Variables

```
SCREENSHOTS_DIR="./screenshots"
ACCESS_TOKEN="your-secret-token"
PUBLIC_URL="https://your-domain.com"
```

## Nginx Configuration

```nginx
location ~ "^/screenshots/([a-f0-9]{2})([a-f0-9]{2})([a-f0-9-]+)$" {
    try_files /screenshots/$1/$1$2/$1$2$3.png =404;
}
```
