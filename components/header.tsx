import SearchBar from "./searchBar";
const Header = () => {
    return (
        <div className="w-full text-start lg:flex items-center justify-between px-12 h-[150px]">
            <h1 className="text-[24px]">Members</h1>
            <SearchBar />
        </div>
    );
}
 
export default Header;
