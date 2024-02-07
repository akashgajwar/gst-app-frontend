import moment from "moment"

export function loadScript(url) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export const getTimeAgo = (createdAt) => {
  const now = moment()
  const createdDate = moment(createdAt)
  const minutesAgo = now.diff(createdDate, 'minutes')
  const hoursAgo = now.diff(createdDate, 'hours')
  const daysAgo = now.diff(createdDate, 'days')

  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`
  } else {
    return `${daysAgo} days ago`
  }
}
