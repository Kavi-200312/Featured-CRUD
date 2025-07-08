import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageUsers, setExportLoading, setExportType } from "../features/user/UserSlice";
import { exportUser, fetchUser } from "../features/user/UserAPI";
import { toastLimtter } from "../utlis/commonFunc";

const SearchAndExport = () => {
    const dispatch = useDispatch()
    const { users,
        page,
        export: {
            exportData,
            exportHeaders,
            exportType,
            exportLoading
        }
    } = useSelector((state) => state.users)
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedTerm, setDebouncedTerm] = useState("")
    const [selectedType, setSelectedType] = useState("")

    const handleExport = async (e) => {
        const type = e.target.value
        setSelectedType(type)
        dispatch(setExportType(type))
        if (type === "current") {
            dispatch(setCurrentPageUsers(users))
        } else {
            dispatch(setExportLoading(true))
            try {
                const response = await dispatch(exportUser({
                    searchTerm,
                    exportType: type,
                })).unwrap();

            } catch (err) {
                console.error("Export failed", err);
            } finally {
                dispatch(setExportLoading(false))
            }
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedTerm(searchTerm)
        }, 500)
        return () => clearInterval(timeout)
    }, [searchTerm])

    useEffect(() => {
        dispatch(fetchUser({
            page,
            limit: 10,
            searchTerm: debouncedTerm
        }))
    }, [page, debouncedTerm])

    return (
        <div className="search-container">
            <input
                className='search-input'
                type="text"
                placeholder='Search...'
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            <div>
                <select onChange={handleExport} defaultValue="">
                    <option value="" disabled>Select Export Option</option>
                    <option value="current">Export Current Page</option>
                    {searchTerm !== "" && <option value="filtered">Export Filtered Items</option>}
                    <option value="all">Export All</option>
                </select>

                <CSVLink
                    data={exportData}
                    headers={exportHeaders}
                    onClick={(e) => {
                        if (selectedType !== "") {
                            return true;
                        } else if (exportData.length <= 0) {
                            toastLimtter("No users found" ,"error")
                            return false;
                        }
                        else {
                            toastLimtter("Please select the export option" ,"error")
                            return false;
                        }
                    }}
                    filename="users_export.csv"
                    className={`export-btn ${exportLoading ? "loading" : ""}`}
                    target="_blank"
                >
                    {exportLoading ? (
                        <span className="spinner"></span>
                    ) : (
                        "Export"
                    )}
                </CSVLink>

            </div>


        </div>
    )
}

export default SearchAndExport
