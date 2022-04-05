## Manifest & manifest version
Extensions, themes, websites and applications are simply bundles of resources, wrapped up with a manifest.json file that describes the package's contents. In particular, every Chrome extension has a JSON-formatted manifest file, named manifest.json, that provides important information i.e. metadata about your extension.
<br><br>
Manifest versions are Chrome browser's rules for browser extensions. Each extensions manifest version update introduces backwards-incompatible changes, supposedly to move the platform forward. The manifest version specifies:
- The required format for a manifest file
-  The features available for the manifest file (i.e. the attributes available)

To utilize the format and features of manifest version n (currently, the only supported versions are 2 and 3), give the "manifest_version" attribute as follows:
"manifest_version": n

### REFERENCES:
- https://developer.chrome.com/docs/extensions/mv3/manifest/
- https://developer.chrome.com/docs/extensions/mv2/manifestVersion/
- https://developer.chrome.com/docs/extensions/mv3/manifest/manifest_version/

## Differences between manifest versions 2 & 3
### 1.
Browser action ("browser_action") is simply action ("action").  Furthermore, the "chrome.browserAction" and "chrome.pageAction" APIs have been replaced by "chrome.action" API for extensions based on manifest version 3.
### 2.
Background scripts are now referred to as background service workers. In manifest version 2, to include background scripts, we did:
```
"background": {
    "scripts": ["background1.js", "background2.js"...]
}
```
In manifest version 3, to include background service worker (only one service worker can be included), we do:
```
"background": {
        "service_worker": "background.js"
}
```