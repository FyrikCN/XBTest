// 只做了功能，没有做页面

// 读取file并转换成image
function readImg(file) {
	return new Promise((resolve, reject) => {
		const img = new Image()
	    const reader = new FileReader()
	    reader.onload = function(e) {
			img.src = e.target.result
	    }
	    reader.onerror = function(e) {
			reject(e)
	    }
		reader.readAsDataURL(file)
		img.onload = function() {
			resolve(img)
		}
		img.onerror = function(e) {
			reject(e)
		}
	})
}

// 压缩图片
function compressImg(img, type, mw, mh) {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('2d')
		const { width: originWidth, height: originHeight } = img
		// 最大尺寸限制
		const maxWidth = mw
		const maxHeight = mh
		// 目标尺寸
		let targetWidth = originWidth
		let targetHeight = originHeight
		if (originWidth > maxWidth || originHeight > maxHeight) {
			if (originWidth / originHeight > 1) {
				// 宽图片
				targetWidth = maxWidth
				targetHeight = Math.round(maxWidth * (originHeight / originWidth))
			} else {
				// 高图片
				targetHeight = maxHeight
				targetWidth = Math.round(maxHeight * (originWidth / originHeight))
			}
		}
		canvas.width = targetWidth
		canvas.height = targetHeight
		context.clearRect(0, 0, targetWidth, targetHeight)
		// 图片绘制
		context.drawImage(img, 0, 0, targetWidth, targetHeight)
		canvas.toBlob(function(blob) {
			resolve(blob)
		}, type || 'image/png')
	})
}

async function upload(file){
	const img = await readImg(file)
	const blob = await compressImg(img, file.type, 200, 200)
	// some post methods / export / DOM setter
}
upload(file).catch(e)