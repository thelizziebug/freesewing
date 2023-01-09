import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import Link from 'next/link'
import { useState } from 'react'
import { validateEmail, validateTld } from 'shared/utils.mjs'
import SusiWrapper from 'site/components/wrappers/susi.js'

const darkLinkClasses = 'decoration-1 underline text-medium font-medium hover:decoration-2'

const SignInPage = () => {
  const app = useApp()
  const { t } = useTranslation(['suli'])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameIsEmail, setUsernameIsEmail] = useState(false)
  const [clearUser, setClearUser] = useState(app.username ? false : true)

  const updateUsername = (evt) => {
    const value = evt.target.value
    setUsername(value)
    const valid = (validateEmail(value) && validateTld(value)) || false
    setUsernameIsEmail(valid === true ? true : false)
  }
  const updatePassword = (evt) => setPassword(evt.target.value)
  const clearUsername = (evt) => app.setUsername(false)

  return (
    <Page app={app} title={t('welcomeBack')} layout={Layout} footer={false}>
      <SusiWrapper theme={app.theme}>
        <h1 className="text-neutral-content font-light text-3xl mb-4 pb-0 text-center">
          {t('welcomeName', { name: app.username || '' })}
        </h1>
        {!app.username && (
          <>
            <p className="text-neutral-content">Sign in to FreeSewing below:</p>
            <input
              type="username"
              name="username"
              onChange={updateUsername}
              placeholder={t('emailUsernameId')}
              className="input input-bordered w-full text-base-content"
              autoFocus={true}
              value={username}
            />
          </>
        )}
        <input
          type="password"
          name="password "
          onChange={updatePassword}
          placeholder={t('password')}
          className="mt-2 input input-bordered w-full text-base-content"
          autoFocus={true}
          value={password}
        />
        <button className="btn mt-4 capitalize w-full btn-primary" tabIndex="-1" role="button">
          <span>{t('signIn')}</span>
        </button>
        <ul className="mt-4 flex flex-row gap-2 text-sm items-center justify-center">
          {(usernameIsEmail || app.username) && (
            <li>
              <button className={darkLinkClasses}>Email me a login link</button>
            </li>
          )}
          {(usernameIsEmail || app.username) && app.username && <li>|</li>}
          {app.username && (
            <li>
              <button className={darkLinkClasses} onClick={clearUsername}>
                Sign in as another user
              </button>
            </li>
          )}
        </ul>
        <p className="text-neutral-content text-sm mt-4 opacity-80 text-center">
          {t('dontHaveAnAccount')}{' '}
          <Link className={darkLinkClasses} href="/signup">
            {t('signUpHere')}
          </Link>
        </p>
      </SusiWrapper>
    </Page>
  )
}

export default SignInPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
