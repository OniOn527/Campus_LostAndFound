import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'

// ✅ 自定义不同颜色的 marker 图标
const lostIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const foundIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

export default function MapWall() {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios
            .get('/api/items/search')
            .then((res) => setItems(res.data.filter((i) => i.latitude && i.longitude)))
            .catch(() => alert('❌ 获取物品失败'))
    }, [])

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🌍 地图展示全部物品</h2>
            <MapContainer center={[39.914, 116.403]} zoom={13} style={{ height: 500 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {items.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.latitude, item.longitude]}
                        icon={item.type === 'lost' ? lostIcon : foundIcon}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong>{item.title}</strong>
                                <br />
                                {item.type === 'lost' ? '❓ 丢失' : '✅ 拾获'}
                                <br />
                                <Link
                                    to={`/item/${item.id}`}
                                    className="text-blue-600 hover:underline block mt-1"
                                >
                                    查看详情
                                </Link>
                            </div>
                        </Popup>

                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
