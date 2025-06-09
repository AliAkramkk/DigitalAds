import React from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import DashboardMetrics from '../../components/admin/DashboardMetrics'
// import DashboardChart from '../../components/customer/DashboardChart'
import DashboardCharts from '../../components/admin/DashboardCharts'
import AdminBlogList from './AdminBlogList'

const AdminDashbord = () => {
  return (
      <AdminLayout>
      <h1 className="text-2xl font-semibold">Welcome, Admin</h1>
      <DashboardMetrics />
      <DashboardCharts />
      {/* <AdminBlogList /> */}
    </AdminLayout>
  )
}

export default AdminDashbord