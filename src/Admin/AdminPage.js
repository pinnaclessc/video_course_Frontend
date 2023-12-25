import React from 'react'
import style from './AdminPage.module.css'
import { Link } from 'react-router-dom'

export default function AdminPage() {
  return (
    <div className={style["admin-page"]}>
        <div className={style["admin-page-side-bar"]}></div>
        <div className={style["admin-page-body"]}></div>
    </div>
  )
}
