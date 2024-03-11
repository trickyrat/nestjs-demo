import moment from 'moment';

function getNowString(): string {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}


export {
  getNowString
}