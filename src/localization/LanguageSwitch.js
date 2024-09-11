import React from 'react';
import i18n from './i18n';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
}));
export default function LanguageSwitch() {
  const classes = useStyles();
  const [language, setLanguage] = React.useState('en');
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('choosenLanguage', event.target.value);
    setLanguage(event.target.value);
  };
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex' }}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-controlled-open-select-label'>
          {t('Language')}
        </InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          value={language}
          onChange={handleChange}
          inputProps={{
            lang: 'age',
          }}
          label={t('Language')}
        >
          <MenuItem value={'en'}>En</MenuItem>
          <MenuItem value={'sr'}>Sr</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
