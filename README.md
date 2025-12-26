# Breadcrumbs

File upload service. In terms of the application, uploads are called `breadcrumbs`.

## Directory Structure

Breadcrumbs are stored in a 3-level hierarchy:

```
data/breadcrumbs/55/550e/550e8400-e29b-41d4-a716-446655440000.png
```

## Environment Variables

The application requires specifying an `ACCESS_TOKEN`, which is a secret key needed to access the application's API endpoints.

The `PUBLIC_URL` option allows you to customize the breadcrumbs URL in API responses. Typically, it should be the actual hostname where the application is deployed.

```
ACCESS_TOKEN="your-secret-token"
PUBLIC_URL="https://your-domain.com"
DATA_DIR="./data"
```

## Nginx Configuration

Application designed to serve uploads statically via Nginx. Example configuration:

```nginx
location ~ "^/breadcrumbs/([a-f0-9]{2})([a-f0-9]{2})([a-f0-9-]+)$" {
    try_files /data/breadcrumbs/$1/$1$2/$1$2$3.png =404;
}
```
