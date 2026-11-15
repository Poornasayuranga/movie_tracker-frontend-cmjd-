import axiosClient from '../api/axiosClient'

export const getRemainingSeats = async (showId) => {
	const response = await axiosClient.get(`/booking/remaining-seats/${showId}`)
	return response.data
}

export const getAllBookings = async () => {
	const response = await axiosClient.get('/booking')
	return response.data
}

export const createBooking = async (bookingData) => {
	const totalAmount = Number(bookingData.totalAmount)
	const bookingPayload = {
		...bookingData,
		totalAmount: Number.isFinite(totalAmount) ? totalAmount : 0,
	}
	const response = await axiosClient.post('/booking', bookingPayload)
	return response.data
}
