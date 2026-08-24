---
name: WebP image delivery
description: Project decision for reducing image transfer size without breaking older content.
---

Prefer WebP as the primary image format. New admin crops should be encoded in the browser before upload so the development upload route does not depend on an image-processing binary being available in every runtime.

**Why:** Browser support for WebP is broad, while keeping an original fallback protects legacy or externally sourced content during migration.

**How to apply:** Use a picture/source WebP preference for local raster paths, retain a fallback image where one exists, and keep data references pointed at local WebP assets when external originals have been migrated.