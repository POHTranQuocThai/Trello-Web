
import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { logoutUserAPI } from '~/redux/activeBoard/user/userSlice'
import { refreshTokenAPI } from '~/apis'

//Không thể import store redux theo cách thông thường được phải làm như cách below:
let axiosReduxStore
export const injectStore = mainStore => { axiosReduxStore = mainStore }

const authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10 //10 minutes

authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    interceptorLoadingElements(true)
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

let refreshTokenPromise = null
// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false)
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false)

    /**Important: xử lý Refresh Token tự động */
    //TH 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất
    if (error.response?.status === 401) {
        axiosReduxStore.dispatch(logoutUserAPI(false))
    }
    //TH 2: Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
    //Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
    const originalRequets = error.config
    if (error.response?.status === 410 && !originalRequets._retry) {
        //Gán thêm 1 giá trị _retry luôn = true trong khoảng thời gian chờ,đảm bảo việc refresh token này
        //thì luôn gọi 1 lần tại 1 thời điểm
        originalRequets._retry = true
        //Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token đồng thời
        //gán vào cho cái refreshTokenPromise
        if (!refreshTokenPromise) {
            refreshTokenPromise = refreshTokenAPI()
                .then(data => {
                    //
                    return data?.accessToken
                })
                .catch(() => {
                    //Nếu nhận bất kỳ lỗi nào từ gọi api refresh token thì cứ logout luôn
                    axiosReduxStore.dispatch(logoutUserAPI(false))
                    return Promise.reject(_error)
                })
                .finally(() => {
                    //Dù API có ok hay lỗi thì vẫn gán cái refreshTokenPromise về null ban đầu
                })
        }
    }
    //Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây
    let errorMessage = error?.message
    if (error.response?.data?.message) {
        errorMessage = error.response?.data?.message
    }
    if (error.response?.status !== 410) {
        toast.error(errorMessage)
    }
    return Promise.reject(error)
})

export default authorizedAxiosInstance