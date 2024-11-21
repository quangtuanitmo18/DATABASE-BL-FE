/* eslint-disable import/no-unresolved */
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Helmet } from 'react-helmet-async'
import useMutationLogin from 'src/hooks/services/auth/useMutationLogin'
import { LoginUserBody, LoginUserResponse } from 'src/types/user/user.api.type'
import Input from 'src/components/input'
import Button from 'src/components/button'
import path from 'src/utils/path'

type FormData = Pick<Schema, 'username' | 'password'>
const loginSchema = schema.pick(['username', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const { loginMutate, isPendingLogin } = useMutationLogin()
  const onSubmit = handleSubmit((data: LoginUserBody) => {
    loginMutate(
      { user: data },
      {
        onSuccess: (data) => {
          setProfile(data.data.data as LoginUserResponse)
          setIsAuthenticated(true)
          navigate(path.home)
        }
        // onError: (error) => {
        //   if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        //     const formError = error.response?.data.data
        //     if (formError) {
        //       Object.keys(formError).forEach((key) => {
        //         setError(key as keyof FormData, {
        //           message: formError[key as keyof FormData],
        //           type: 'Server'
        //         })
        //       })
        //     }
        //   }
        // }
      }
    )
  })

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='flex min-h-screen items-center justify-center'>
          <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
            <div className='text-2xl'>Login</div>
            <Input
              name='username'
              register={register}
              type='text'
              className='mt-8'
              errorMessage={errors.username?.message}
              placeholder='Username'
            />
            <Input
              name='password'
              register={register}
              type='password'
              className='mt-2'
              classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
              errorMessage={errors.password?.message}
              placeholder='Password'
              autoComplete='on'
            />
            <div className='mt-3'>
              <Button
                type='submit'
                className='flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                // isLoading={loginMutation.isLoading}
                disabled={isPendingLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
