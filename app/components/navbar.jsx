import TablerIcon from "./tabler";

const navbars = [{
    "title": "Games",
    "icon": "TbDeviceGamepad2",
    "active": false,
}, {
    "title": "Apps",
    "icon": "TbAppsFilled",
    "active": true,
},{
    "title": "Movies",
    "icon": "TbMovie",
    "active": false,
},{
    "title": "Books",
    "icon": "TbBook2",
    "active": false,
}, {
    "title": "Kids",
    "icon": "TbStar",
    "active": false,
}]
export default function NavBar() {
    return (
      <div className="nav-bar flex justify-between mx-5 py-2 bg-white">
        {
            navbars.map((item, index) => (
                <div key={index} className=" text-slate-600 hover:text-green-700 ">
                    <div className={"flex justify-center " + (item.active && 'text-green-700')}>
                        <TablerIcon iconName={item.icon} size="24" />
                    </div>
                    <div className={"text-sm" + (item.active && 'text-green-700')}>{item.title}</div>
                </div>
            ))
        }
      </div>
    );
}
  