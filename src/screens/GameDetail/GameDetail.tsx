import React from "react";
import {useParams} from "react-router-dom";
import LayoutGameDetail1 from "../../layout/LayoutGameDetail1/LayoutGameDetail1";
import LayoutGameDetail2 from "../../layout/LayoutGameDetail2/LayoutGameDetail2";

let detail = {
    name: "Liên minh huyền thoại",
    genres: [
        "competitye",
        "Action"
    ],
    features: [
        "Multiplayer"
    ],
    description:"Liên Minh Huyền Thoại (LMHT) là trò chơi trên máy tính do Riot Games, một công ty có trụ sở ở Mỹ, tạo ra. Được định nghĩa là một game Multiplayer Online Battle Arena (MOBA), được pha trộn thể loại nhập vai và chiến thuật nhóm.",
    minimumWindow:[
        {name: 'OS', value: 'Windows 7 64-bit, 8/8.1, 10'},
        {name: 'Processor', value: 'Intel Core 2 or AMD Athlon 64 1.8GHz+'},
        {name: 'Memory', value: '4 GB RAM'},
        {name: 'Graphics', value: 'Intel GMA X4500, NVIDIA GeForece 9600M GT, AMD/ATI Mobility Raedon HD 3650 - 256MB VRAM'},
        {name: 'DirectX', value: 'Version 11'},
        {name: 'Storage', value: '7 GB available space'},
    ],
    recommendedWindow: [
        {name: 'OS', value: 'Windows 7 64-bit, 8/8.1, 10'},
        {name: 'Processor', value: 'Intel Core 2 or AMD Athlon 64 1.8GHz+'},
        {name: 'Memory', value: '4 GB RAM'},
        {name: 'Graphics', value: 'Intel GMA X4500, NVIDIA GeForece 9600M GT, AMD/ATI Mobility Raedon HD 3650 - 256MB VRAM'},
        {name: 'DirectX', value: 'Version 11'},
        {name: 'Storage', value: '7 GB available space'},
    ],
    minimumMacOs:[
        {name: 'OS', value: 'MAC OS X 10.13.6, 10.14.6, 10.15.5, 11.5 - 64-bit'},
        {name: 'Processor', value: 'Intel Core 2 Duo - 1.8GHz+'},
        {name: 'Memory', value: '4 GB RAM'},
        {name: 'Graphics', value: 'Intel GMA X4500, NVIDIA GeForece 9600M GT, AMD/ATI Mobility Raedon HD 3650 - 256MB VRAM - macOS 10.13 required OpenGL 2,1, macOS 10.14 and later requires Metal'},
        {name: 'Storage', value: '7 GB available space'},
    ],
    recommendedMacOs: [
        {name: 'OS', value: 'MAC OS X 10.13.6, 10.14.6, 10.15.5, 11.5 - 64-bit'},
        {name: 'Processor', value: 'Intel Core 2 Duo - 1.8GHz+'},
        {name: 'Memory', value: '4 GB RAM'},
        {name: 'Graphics', value: 'Intel GMA X4500, NVIDIA GeForece 9600M GT, AMD/ATI Mobility Raedon HD 3650 - 256MB VRAM - macOS 10.13 required OpenGL 2,1, macOS 10.14 and later requires Metal'},
        {name: 'Storage', value: '7 GB available space'},
    ],
    discount: 0.5,
    price: 240000,
    details:[
        {name: "Developer", value: "Trần Đình Khôi"},
        {name: "Publisher", value: "123"},
        {name: "Release Date", value: "14 Aug 2021"},
        {name: "Os", value: "Window"}
    ],
    requiresMinimum: 'a 64-bit processor and operating system',
    requiresRecommended: 'a 64-bit processor and operating system'
}

function GameDetail(){
    let slug: any = {};
    slug  = useParams();
    return(
        <div>
            <LayoutGameDetail1 detail={detail}></LayoutGameDetail1>
            <LayoutGameDetail2 detail={detail}></LayoutGameDetail2>
        </div>
    )
}

export default GameDetail;