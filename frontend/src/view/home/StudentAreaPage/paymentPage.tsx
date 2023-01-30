import { i18n } from 'src/i18n';
import { useEffect } from 'react';
import StudentAreaLayout from 'src/view/home/layout/studentAreaLayout';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import Header from 'src/view/home/layout/Header';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import moment from 'moment';
import {
  Grid,
  Card,
  TableContainer,
  TableRow,
  TableBody,
  Table,
} from '@mui/material';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';

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
                  {i18n('student.class.title')}
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
                    {i18n('payment.history.title')}
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <TableContainer
                    sx={{ boxShadow: 'none' }}
                  >
                    <Table>
                      <MDBox component="thead">
                        <TableRow>
                          <DataTableHeadCell sorted={false}>
                            {i18n(
                              'payment.fields.paymentCategory',
                            )}
                          </DataTableHeadCell>
                          <DataTableHeadCell sorted={false}>
                            {i18n(
                              'payment.fields.paymentMethod',
                            )}
                          </DataTableHeadCell>
                          <DataTableHeadCell sorted={false}>
                            {i18n(
                              'payment.fields.paymentDate',
                            )}
                          </DataTableHeadCell>
                          <DataTableHeadCell sorted={false}>
                            {i18n('payment.fields.amount')}
                          </DataTableHeadCell>
                          <DataTableHeadCell sorted={false}>
                            {i18n('payment.fields.VAT')}
                          </DataTableHeadCell>
                          <DataTableHeadCell sorted={false}>
                            {i18n('payment.fields.cost')}
                          </DataTableHeadCell>
                        </TableRow>
                      </MDBox>
                      <TableBody>
                        {student.payments.length === 0 && (
                          <TableRow>
                            <DataTableBodyCell
                              align="center"
                              colSpan={100}
                            >
                              <MDTypography>
                                {i18n('table.noData')}
                              </MDTypography>
                            </DataTableBodyCell>
                          </TableRow>
                        )}
                        {student.payments.map(
                          (payment, index) => (
                            <TableRow key={index}>
                              <DataTableBodyCell>
                                {payment.category?.name}
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                {
                                  payment.paymentMethod
                                    ?.name
                                }
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                {moment(
                                  payment.createdAt,
                                ).format(
                                  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                                )}
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                {payment.quantity *
                                  payment.price}
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                {payment.VAT}
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                {payment.cost}
                              </DataTableBodyCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </StudentAreaLayout>
    </>
  );
}
