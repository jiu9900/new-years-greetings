import { useState, useRef, useCallback } from "react"
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function AvatarUpload() {
  const [imgSrc, setImgSrc] = useState("")
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [croppedImageUrl, setCroppedImageUrl] = useState(null)
  const imgRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "")
        setIsOpen(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current) return

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const pixelRatio = window.devicePixelRatio
    canvas.width = completedCrop.width * pixelRatio
    canvas.height = completedCrop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = "high"

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    )

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty")
          return
        }
        const croppedImageUrl = URL.createObjectURL(blob)
        setCroppedImageUrl(croppedImageUrl)
        setIsOpen(false)
      },
      "image/jpeg",
      0.95,
    )
  }, [completedCrop])

  const handleUpload = () => {
    console.log("Uploading cropped image:", croppedImageUrl)
    // 实现实际的上传逻辑
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <button>
        <label className="cursor-pointer">
          选择头像
          <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
        </label>
      </button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-[450px] max-h-[85vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-bold mb-4">裁剪头像</Dialog.Title>
            {Boolean(imgSrc) && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc || "/placeholder.svg"}
                  onLoad={onImageLoad}
                  style={{ maxWidth: "100%" }}
                />
              </ReactCrop>
            )}
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setIsOpen(false)} >
                取消
              </button>
              <button onClick={getCroppedImg}>确定</button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {croppedImageUrl && (
        <div className="mt-4 text-center">
          <img
            src={croppedImageUrl || "/placeholder.svg"}
            alt="Cropped"
            className="w-32 h-32 rounded-full mx-auto mb-2"
          />
          <button onClick={handleUpload}>上传头像</button>
        </div>
      )}
    </div>
  )
}

