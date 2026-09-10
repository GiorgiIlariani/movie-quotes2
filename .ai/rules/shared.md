---
paths:
    - 'resources/js/components/shared/**'
---

# Shared

## ImageUpload drop zone layout

ImageUpload is a full-width dark bordered row: camera icon, hint text, then a purple Choose file button. Pass hint and buttonLabel. The file input is named cover by default.

## ImageUpload uses a label not a ref

ImageUpload wraps the file input in a label. Style the label and the Choose file span. Do not use a ref to click the input.

## ImageUpload shows a preview after pick

After a file is chosen, ImageUpload shows a full-width rounded preview with a centered camera icon and Change Photo overlay. The input stays inside the label so clicking the preview opens the picker again.

## Change Photo is a hover chip

On ImageUpload preview, Change Photo is a small centered box that appears only on hover. Do not stretch a dim overlay across the whole image.

## ImageUpload preview from file or URL

ImageUpload accepts optional src for an existing server URL (edit). Store the preview string in state (src first, then a blob URL after pick). Create the blob URL in the change handler, revoke the previous preview there, and also revoke in a useEffect cleanup keyed on preview so it does not leak on replace or unmount. Do not create the blob URL in an effect keyed on File.
