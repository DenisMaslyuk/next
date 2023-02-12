import styles from '@/styles/Numbers.module.css'

export default function Numbers() {
  return (
    <>
      <main className={styles.main}>
        <form className={styles.form}>
          <label htmlFor="number1" className={styles.label}></label>
          <input id="number1" type="number" className={styles.input} />
        </form>
      </main>
    </>
  )
}
