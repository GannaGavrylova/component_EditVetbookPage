import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import s from "./fileUploader.module.css"
import close from "@/assets/close.svg"
import plus from "@/assets/plus.svg"

export const FileUploader = ({
  maxFiles = 3,
  boxSize = 104,
  borderRadius = "20px",
  onUpload = () => { },
}) => {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (typeof onUpload === "function") {
      const fileData = files.map(({ file, url }) => ({
        file,
        url,
        type: file.type,
        name: file.name,
      }))
      onUpload(fileData)
    }
  }, [files, onUpload])
  //TODO: replace all func to utils
  const handleFileUpload = (event) => {
    if (!event.target.files) {
      console.error("No files selected")
      return
    }

    const selectedFiles = Array.from(event.target.files)

    if (files.length + selectedFiles.length > maxFiles) {
      alert(t("fileUploader.uploadLimitError", { maxFiles }))
      return
    }

    const validFiles = selectedFiles
      .filter((file) => {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          return true
        }
        alert(t("fileUploader.unsupportedFileType", { fileName: file.name }))
        return false
      })
      .map((file) => {
        const newFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified || Date.now(),
        })

        return {
          file: newFile,
          url: URL.createObjectURL(newFile),
          name: newFile.name,
          type: newFile.type,
          lastModified: newFile.lastModified,
          size: newFile.size,
        }
      })

    setFiles([...files, ...validFiles])
  }

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].url)
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={s.uploaderContainer}>
      <div className={s.previewContainer}>
        {files.map((fileObj, index) => (
          <div
            key={index}
            className={s.previewBox}
            style={{
              width: boxSize,
              height: boxSize,
              borderRadius: borderRadius,
            }}
          >
            {fileObj.file.type.startsWith("image/") ? (
              <img
                src={fileObj.url}
                alt={`preview-${index}`}
                className={s.previewImage}
                style={{
                  width: boxSize,
                  height: boxSize,
                  borderRadius: borderRadius,
                }}
              />
            ) : (
              <video
                controls
                className={s.previewImage}
                style={{
                  width: boxSize,
                  height: boxSize,
                  borderRadius: borderRadius,
                }}
              >
                <source src={fileObj.url} />
              </video>
            )}
            <button
              className={s.removeButton}
              onClick={() => removeFile(index)}
            >
              <img
                style={{ width: "10px", height: "10px", alignSelf: "center" }}
                src={close}
                alt="close"
              />
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <div
            className={s.uploadBox}
            style={{
              width: boxSize,
              height: boxSize,
              borderRadius: borderRadius,
            }}
            onClick={handleBoxClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              multiple
            />
            <div className={s.addBox} style={{ fontSize: boxSize / 4 }}>
              <img
                src={plus}
                alt="plus"
                style={{ width: boxSize / 2.88, height: boxSize / 2.88 }}
              />
            </div>
          </div>
        )}

        {Array.from({ length: Math.max(0, maxFiles - files.length - 1) }).map(
          (_, idx) => (
            <div
              key={idx}
              className={s.emptyBox}
              style={{
                width: boxSize,
                height: boxSize,
                borderRadius: borderRadius,
              }}
            ></div>
          )
        )}
      </div>
    </div>
  )
};


