/**
 * Created by zhangjiasheng on 16/9/12.
 */
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: 'smtp.163.com',
	port: 25,
	auth: {
		user: 'greenicetech@163.com',
		pass: 'greenicetech163'
	}
})

export const sendMail = (to, subject, html, callback) => {
	transporter.sendMail({
		from: 'greenicetech@163.com',
		to,
		subject,
		html
	}, (err,info) => {
		if (err) {
			callback(err)
		}else {
			callback(null, info)
		}
	})
}