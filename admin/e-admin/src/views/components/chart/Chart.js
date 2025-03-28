import "./chart.css"
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis
} from "recharts"

export default function Chart({ bookingData }) {
  const transformedData = bookingData.map(item => ({
    date: item[0],   // First element is the date
    bookings: item[1] // Second element is the booking count
  }))

  return (
    <div style={{ width: '95%', height: 400, marginTop: '30px', marginBottom: '30px' }}>z
      <ResponsiveContainer>
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
