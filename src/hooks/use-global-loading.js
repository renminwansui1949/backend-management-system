export const useGlobalLoading = () => {
  /**
   * 全局loading
   * 防止白屏焦虑
   */
  const openGlobalLoading = () => {
    const beforeLoading = document.querySelector('.before-loading')
    beforeLoading.style.display = 'black'
  }

  const closeGlobalLoading = () => {
    const beforeLoading = document.querySelector('.before-loading')
    beforeLoading.style.display = 'none'
  }

  return {
    openGlobalLoading,
    closeGlobalLoading,
  }
}
