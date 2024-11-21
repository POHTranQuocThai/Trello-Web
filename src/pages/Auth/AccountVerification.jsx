import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
    let [searchParams] = useSearchParams()
    const { email, token } = Object.fromEntries([...searchParams])

    //Tạo một biến state để biết được là đã verify tài khoản hay chưa
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (email && token) {
            verifyUserAPI({ email, token }).then(() => { setVerified(true) })
        }
    }, [email, token])
    //Gọi api để verify tài khoản
    if (!email || !token) {
        return <Navigate to='/404' />
    }

    //Nếu chưa verify thì hiện loading
    if (!verified) {
        return <PageLoadingSpinner caption={'Verifying your account...'} />
    }
    return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification