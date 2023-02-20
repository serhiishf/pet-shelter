import React from 'react';
import styles from './LibraryForm.module.scss';
import Input from '../../Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import booksApi from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';

export default function LibraryForm() {
  const initialValues = {
    name: '',
    author: '',
    year: '',
    pages: '',
  };

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, 'validation.min3')
        .max(50, 'validation.max50')
        .required('validation.required'),
      author: yup
        .string()
        .min(3, 'validation.min3')
        .max(40, 'validation.max54')
        .required('validation.required'),
      year: yup
        .string()
        .matches(/^[0-9]*$/, 'validation.year')
        .min(4, 'validation.min4')
        .max(4, 'validation.max4'),
      pages: yup
        .string()
        .matches(/^[0-9]*$/, 'validation.pages')
        .min(2, 'validation.min2')
        .max(4, 'validation.max4')
        .required('validation.required'),
    }),
    onSubmit: (values) => {
      const { name, author, year, pages } = values;
      booksApi.createBook({ name, author, year, pages });
      formik.resetForm();
    },
  });

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            formik.handleSubmit();
          }
        }}
      >
        <div className={styles.inputWrapper}>
          <Input
            labelName={t('library.title')}
            name={'name'}
            type={'text'}
            value={formik.values.name}
            handleChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className={styles.notification}>{t(formik.errors.name)}</p>
          ) : null}
        </div>
        <div className={styles.inputsTablet}>
          <div className={`${styles.inputWrapper} ${t(styles.wrapperAuthor)}`}>
            <Input
              labelName={t('library.author')}
              name={'author'}
              type={'text'}
              value={formik.values.author}
              handleChange={formik.handleChange}
            />
            {formik.errors.author && formik.touched.author ? (
              <p className={styles.notification}>{t(formik.errors.author)}</p>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              labelName={t('library.year')}
              name={'year'}
              type={'text'}
              value={formik.values.year}
              handleChange={formik.handleChange}
            />
            {formik.errors.year && formik.touched.year ? (
              <p className={styles.notification}>{t(formik.errors.year)}</p>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              labelName={t('library.page')}
              name={'pages'}
              type={'text'}
              value={formik.values.pages}
              handleChange={formik.handleChange}
            />
            {formik.errors.pages && formik.touched.pages ? (
              <p className={styles.notification}>{t(formik.errors.pages)}</p>
            ) : null}
          </div>
        </div>
        <div className={styles.btn}>
          <button type="submit" className={styles.addBtn}>
            {t('library.add')}
          </button>
        </div>
      </form>
    </div>
  );
}
