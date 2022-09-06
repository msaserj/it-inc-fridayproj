import React from 'react';
import s from "./CardListTable.module.css";
import {SortButton} from "../../../common/components/SortButton/SortButton";
import {CardsListItem} from "./CardListItem/CardsListItem";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import {setCardsSortDirectionAC, setCurrentPageCardsListAC} from "../cardList-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";

import {CardType} from "../cards-api";
import {SuperSmallButton} from "../../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";

export const CardListTable = () => {

    const dispatch = useAppDispatch();

    const sortCards = useAppSelector<string>(state => state.cardsList.sortCards);
    const currentPage = useAppSelector<number>(state => state.cardsList.page);
    const pageSize = useAppSelector<number>(store => store.cardsList.pageCount);
    const cardsTotalCount = useAppSelector<number>(state => state.cardsList.cardsTotalCount);
    const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
    const user_ID = useAppSelector(state => state.auth.user._id);
    const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
    const packUser_ID = useAppSelector(state => state.cardsList.packUserId);

    const changePageHandler = (page: number) => {
        dispatch(setCurrentPageCardsListAC(page));
    };

    //	фильтрация карт по типу (тип передаем в виде строки)
    const changeCardsSortDirection = (sortType: string) => {
        if (sortCards === "0" + sortType) {
            dispatch(setCardsSortDirectionAC(`1${sortType}`));
        } else {
            dispatch(setCardsSortDirectionAC(`0${sortType}`));
        }
    };
    return (
        <div>
            <div className={s.tableMainBlock}>
                <table>

                    <thead className={s.theadStyle}>
                    <tr className={s.trStyle}>
                        <th className={s.sortBlock} >
                            <span>Question</span>
                            <SuperSmallButton style={{padding: "2px 8px"}} onClick={() => changeCardsSortDirection("question")} arrowUp={sortCards === "1question"} />
                            <SortButton
                                onClick={() => changeCardsSortDirection("question")}
                                isActive={sortCards.slice(1) === "question"}
                                direction={sortCards && sortCards[0]}
                                isFetching={isFetchingCards}
                            />
                        </th>
                        <th className={s.sortBlock} onClick={() => changeCardsSortDirection("answer")}>
                            <span>Answer</span>
                            <SortButton
                                isActive={sortCards.slice(1) === "answer"}
                                direction={sortCards && sortCards[0]}
                                isFetching={isFetchingCards}
                            />
                        </th>
                        <th className={s.sortBlock} onClick={() => changeCardsSortDirection("updated")}>
                            <span>Last Updated</span>
                            <SortButton
                                isActive={sortCards.slice(1) === "updated"}
                                direction={sortCards && sortCards[0]}
                                isFetching={isFetchingCards}
                            />
                        </th>
                        <th className={s.sortBlock} onClick={() => changeCardsSortDirection("grade")}>
                            <span>Grade</span>
                            <SortButton
                                isActive={sortCards.slice(1) === "grade"}
                                direction={sortCards && sortCards[0]}
                                isFetching={isFetchingCards}
                            />
                        </th>
                        {user_ID === packUser_ID && <th>Actions</th>}
                    </tr>
                    </thead>

                    <tbody className={s.tbodyStyle}>
                    {cards.map(c => {
                        return (
                            <CardsListItem key={c._id} card={c}/>
                        );
                    })}
                    </tbody>
                </table>
                <div className={s.paginator}>
                    <Paginator
                        siblingCount={3}
                        totalCount={cardsTotalCount}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={changePageHandler}
                    />
                </div>
            </div>
        </div>
    );
};
