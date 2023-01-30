import { i18n } from 'src/i18n';
import { useEffect } from 'react';
import StudentAreaLayout from 'src/view/home/layout/studentAreaLayout';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import Header from 'src/view/home/layout/Header';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import { Card, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import moment from 'moment';

export default function Dashboard(props) {
  const student = useSelector(
    authSelectors.selectCurrentUser,
  );
  return (
    <>
      <Header />
      <StudentAreaLayout>
        <Card>
          <MDBox pt={2.4} px={2.4}>
            <MDBox pb={2.4}>
              <MDBox
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <MDTypography variant="h3">
                  {i18n('student.attendance.title')}
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDBox
                  pt={4}
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <MDTypography>
                    {i18n('user.fields.attendanceHistory')}
                  </MDTypography>
                </MDBox>
                <MDBox p={2}>
                  {student.attendances.map(
                    (attendance, index) => (
                      <Grid
                        container
                        spacing={1.6}
                        key={index}
                      >
                        <Grid item md={4} xs={12}>
                          <MDTypography>
                            {attendance.lesson.class?.name}
                          </MDTypography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <MDTypography>
                            {attendance.time}
                          </MDTypography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <MDTypography>
                            <CheckCircleIcon
                              fontSize="large"
                              color="success"
                            />
                          </MDTypography>
                        </Grid>
                      </Grid>
                    ),
                  )}
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </StudentAreaLayout>
    </>
  );
}
