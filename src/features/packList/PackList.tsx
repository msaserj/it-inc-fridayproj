import s from "./PackList.module.css"
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {getCardsPackThunk, setCurrentPageCardPacksAC} from "./packList-reducer";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {PacksListTable} from "./PackListTable/PackListTable";
import {Paginator} from "./Paginator/Paginator";
import {SearchPanel} from "./SearchPanel";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/Path";
import * as React from "react";
import {useEffect, useState} from "react";
import {AddNewPack} from "./AddNewPack/AddNewPack";


export const PackList = () => {

    const dispatch = useAppDispatch();

    useEffect(()=>
        dispatch(getCardsPackThunk()),
        [dispatch])

    const currentPage = useAppSelector<number>(store => store.packsList.page);
    const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
    const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);
    const [activeModalPack, setModalActivePack] = useState<boolean>(false)
    const [name, setName] = useState<string>('');

    //будет функция добавления новой колоды
    function addCardsPackHandler() {
        // dispatch(addNewPackThunk("addNewPack", false))
        setModalActivePack(true)

    }

    function changePageHandler(page: number) {
        dispatch(setCurrentPageCardPacksAC(page))
        dispatch(getCardsPackThunk());
    }
    const user_ID = useAppSelector(state => state.auth.user._id);
    if (!user_ID) {
        return <Navigate to={PATH.LOGIN}/>
    }
    const modalCloseHandler = () => setModalActivePack(false);

    return (
        <>
            <div className={s.mainBlock}>
                <div className={s.head}>
                    <h2>Packs list</h2>
                    <SuperButton onClick={addCardsPackHandler}>Add new pack</SuperButton>
                </div>

                <SearchPanel/>

                <section className={s.packList}>
                    <PacksListTable/>

                    <Paginator currentPage={currentPage}
                               pageSize={pageSize}
                               totalCount={totalCountPage}
                               onPageChange={changePageHandler}
                               siblingCount={2}
                    />
                </section>
                <AddNewPack open={activeModalPack} handleClose={modalCloseHandler}/>

            </div>
        </>

    );
};

