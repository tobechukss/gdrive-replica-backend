export function getFileCategory(mimeType: string): string {
    if (!mimeType) return "unknown"
  
    if (mimeType.startsWith("image/")) return "image"
    if (mimeType.startsWith("video/")) return "video"
    if (mimeType.startsWith("audio/")) return "audio"
    if (mimeType === "application/pdf") return "pdf"
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType.includes("xls")) return "spreadsheet"
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint") || mimeType.includes("ppt"))
      return "presentation"
    if (mimeType.includes("document") || mimeType.includes("word") || mimeType.includes("text/")) return "document"
    if (mimeType.includes("zip") || mimeType.includes("compressed") || mimeType.includes("archive")) return "archive"
  
    return "other"
  }