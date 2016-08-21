/**
 * Created by zhangjiasheng on 16/8/21.
 */
import fs from 'fs'
import path from 'path'
import City from '../models/city'

const getAllCityFromFile = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve('./', 'config', 'citys.txt'), (err,data) => {
			const jsonData = JSON.parse(data)
			if(err) return reject(jsonData)
			return resolve(jsonData)
		})
	})

}

export const insertToDB = async () => {
	const jsonData = await getAllCityFromFile()
	City.find({}).count().then(count =>{
		if (count > 0 ) {
			console.log("城市列表已经存在,不需要插入")
			return
		}else {
			City.insertMany(jsonData).then((result) => {
				console.log("城市列表插入成功")
			}).catch(err => {
				console.log('城市列表插入失败,请检查')
			})
		}
	})

}
