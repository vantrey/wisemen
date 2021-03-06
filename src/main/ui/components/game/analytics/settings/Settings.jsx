import React from 'react';
import styles from './Settings.module.css';
import { useDispatch, useSelector } from "react-redux";
import { favoriteDecksActions, setGameType } from "../../../../../bll/favoriteDecks/favoriteDecksReducer";


const Settings = ({setCardFace}) => {

	const dispatch = useDispatch ();
	const { gameType, isRandomMode, isMulti, isSound } = useSelector ((state) => state.favoriteDecks);

	const onSelectNumberAnswer = () => {
		dispatch (favoriteDecksActions.setIsMulti (!isMulti));
	};

	const onSelectGameType = (e) => {
		if ( e.target.checked ) {
			dispatch (setGameType ("controlledRandom"));
			dispatch (favoriteDecksActions.setIsRandomMode (true));
		} else {
			dispatch (setGameType ("inOrder"));
			dispatch (favoriteDecksActions.setIsRandomMode (false));
		}
	};

	const onPassTest = (e) => {
		if ( e.target.checked ) {
			dispatch (setGameType ("test"));
			setCardFace(true);
			dispatch (favoriteDecksActions.setIsMulti (true));
			dispatch (favoriteDecksActions.setIsRandomMode (false));
			dispatch (favoriteDecksActions.setIsTestStart (true));
			dispatch (favoriteDecksActions.setBanner ('dataBanner'));
		} else {
			dispatch (setGameType ("inOrder"));
			dispatch (favoriteDecksActions.setIsTestStart (false));
			dispatch (favoriteDecksActions.setBanner ('dragonBanner'));
		}
	};

	const onSound = (e) => {
		if ( e.target.checked ) {
			dispatch(favoriteDecksActions.setIsSound(true));
		} else {
			dispatch(favoriteDecksActions.setIsSound(false));
		}
	};

	const classForlabel = gameType === 'test' ? `${styles.switcher__label} ${styles.switcher__label_active}` : `${styles.switcher__label}`;
	const classForTitle = gameType === 'test' ? `${styles.switcher__title} ${styles.switcher__title_active}` : `${styles.switcher__title}`;
	const classForInput = gameType === 'test' ? `${styles.switcher__input} ${styles.switcher__input_active}` : `${styles.switcher__input}`;

	return (
		<div className={styles.switcher__wrap}>
			<div className={styles.switcher__info}>
				<h6 className={styles.switcher__title}>Number of answers</h6>
				<div className={styles.radio__wrap}>
					<div className={styles.radio}>
						<label className={styles.radio__custom}>
							<input className={styles.radio__input} type="radio" name="numberResponses"
								   value="one" onChange={onSelectNumberAnswer} checked={!isMulti}/>
							<span className={styles.radio__titlte}>one</span>
						</label>
					</div>
					<div className={styles.radio}>
						<label className={styles.radio__custom}>
							<input className={styles.radio__input} type="radio" name="numberResponses"
								    value="few" onChange={onSelectNumberAnswer} checked={isMulti}/>
							<span className={styles.radio__titlte}>few</span>
						</label>
					</div>
					<div className={styles.tooltip}>
						<div className={styles.tooltip_wrap}>
							<h4 className={styles.tooltip_title}>In few answers mode - only one reply is correct</h4>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.switcher__info}>
				<h6 className={styles.switcher__title}>Smart selection</h6>
				<div className={`${styles.switcher} ${styles.switcher1}`}>
					<input className={styles.switcher__input} type="checkbox" id="switcher-1"
						   onChange={onSelectGameType} checked={isRandomMode}/>
					<label className={styles.switcher__label} htmlFor="switcher-1"> </label>
					<div className={styles.tooltip}>
						<div className={styles.tooltip_wrap}>
							<h4 className={styles.tooltip_title}>Rate your answer and a smart
								algorithm will select questions matching for you</h4>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.switcher__info}>
				<h6 className={classForTitle}>Pass a test mode</h6>
				<div className={`${styles.switcher} ${styles.switcher1}`}>
					<input className={classForInput} type="checkbox" id="switcher-2"
						   onChange={onPassTest} checked={gameType === 'test'}/>
					<label className={classForlabel} htmlFor="switcher-2"> </label>
					<div className={styles.tooltip}>
						<div className={styles.tooltip_wrap}>
							<h4 className={styles.tooltip_title}>For each question you have a few
								seconds to give the correct answer</h4>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.switcher__info}>
				<h6 className={styles.switcher__title}>Sound</h6>
				<div className={`${styles.switcher} ${styles.switcher1}`}>
					<input className={styles.switcher__input} type="checkbox" id="switcher-3"
						   onChange={onSound} checked={isSound}/>
					<label className={styles.switcher__label} htmlFor="switcher-3"> </label>
					<div className={styles.tooltip}>
						<div className={styles.tooltip_wrap}>
							<h4 className={styles.tooltip_title}>You can turn on or turn off sound effects</h4>
						</div>
					</div>
				</div>
			</div>
			{(gameType === 'test') && <div className={styles.switcher__popupBlock}></div>}
		</div>
	)
}

export default Settings;