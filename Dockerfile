# Plain static site served on port 8080 (Fly.io)
FROM pierrezemb/gostatic
COPY index.html /srv/http/
COPY assets /srv/http/assets
# HTTPS redirect is handled by Fly (force_https in fly.toml)
CMD ["-port", "8080", "-enable-logging"]
