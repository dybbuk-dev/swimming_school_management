import ClassService from 'src/modules/class/classService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'CLASS_FORM';

const classFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: classFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ClassService.find(id);
      }

      dispatch({
        type: classFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/class');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: classFormActions.CREATE_STARTED,
      });

      await ClassService.create(values);

      dispatch({
        type: classFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('class.doAddSuccess'));

      getHistory().push('/admin/class');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: classFormActions.UPDATE_STARTED,
      });

      await ClassService.update(id, values);

      dispatch({
        type: classFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('class.doUpdateSuccess'));

      getHistory().push('/admin/class');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default classFormActions;
