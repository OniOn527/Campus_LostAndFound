import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'

export default function Home() {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get('/api/items/search')
            .then(res => setItems(res.data))
            .catch(() => alert('❌ 加载信息失败'))
    }, [])

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📋 信息墙</h1>
                <Link to="/login" className="text-blue-600 hover:underline">去登录</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                    <div key={item.id} className="border p-4 shadow rounded bg-white">
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                            {item.location} · {item.type === 'lost' ? '❓丢失' : '✅拾获'}
                        </p>
                        {/* ❌ 不展示图片了 */}
                        {/* <img src={item.images?.[0]} className="w-full h-40 object-cover my-2" /> */}
                        <Link className="text-blue-500 hover:underline" to={`/item/${item.id}`}>
                            查看详情
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
