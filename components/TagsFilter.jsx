import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { Modal, TouchableOpacity, View } from 'react-native';
import { COLORS, isSmall, SIZES } from '../constants';
import { useCallback, useEffect, useState } from 'react';
import UserService from '../services/user.service';

const TagsFilter = ({ setSelectedTags, selectedTags, filterPosts, tags }) => {

	const [open, setOpen] = useState(false);

	const toggleModal = useCallback(() => {
		setOpen((p) => !p);
	}, []);

	const toggleSelection = useCallback(
		(name) => {
			const idx = selectedTags.indexOf(name);
			if (idx !== -1) {
				let arr = selectedTags.filter((i) => i !== name);
				setSelectedTags(arr);
				return;
			}
			setSelectedTags((p) => [...p, name]);
		},
		[selectedTags, setSelectedTags]
	);

	return (
		<Container>
			<TouchableOpacity onPress={toggleModal}>
				<AntDesign
					name="filter"
					size={24}
					color={COLORS.black}
					/>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={open}
				onRequestClose={toggleModal}
			>
				<FilterModal>
					<Title>Categories</Title>
					<Tags>
						{tags.map((tag) => {
							return (
								<Tag
									key={tag}
									onPress={() => {
										toggleSelection(tag)
									
									}}
									selected={selectedTags.includes(tag)}
								>
									<Label size={isSmall && 12} selected={selectedTags.includes(tag)}>{tag}</Label>
								</Tag>
							);
						})}
					</Tags>
					<Button
						onPress={() => {
							filterPosts();
							toggleModal();
						}}
					>
						<Label size={isSmall ? 16 : 20}>Apply</Label>
					</Button>
				</FilterModal>
			</Modal>
		</Container>
	);
};

export default TagsFilter;

// styles

const getStroke = (name) => {
	return name === 'dark' ? '3px solid #F675FF' : '3px solid #5685ff';
};

const Container = styled.View`
	flex: 1;
	padding: 10px;
	flex-direction: row-reverse;
`;

const Title = styled.Text`
	font-size: ${isSmall ? 18 : 20}px;
	letter-spacing: 1.5px;
	color: ${COLORS.white1};
`;

const FilterModal = styled.View`
	background-color: ${COLORS.deepBlue};
	min-height: ${isSmall ? 20 : 30}%;
	border: ${`0px solid ${COLORS.transparent}`};
	margin-top: auto;
	border-top-left-radius: ${SIZES.padding}px;
	border-top-right-radius: ${SIZES.padding}px;
	padding: 20px;
`;

const Tags = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	margin: ${isSmall ? 10 : 20}px 0;
`;

const Tag = styled.TouchableOpacity`
	border-radius: ${SIZES.radius}px;
	background-color: ${(p) =>
		p.selected ? '#888' : '#fff'};
	
	padding: 8px;
	margin: 8px 0px;
	margin-right: 10px;
	border: ${'3px solid transparent'};
`;

const Label = styled.Text`
	font-size: ${(p) => p.size || 14}px;
	color: ${(p) =>
		p.selected ? '#f6f6f6' : '#000'};
	color: ${COLORS.black};
	letter-spacing: 1.5px;
`;

const Button = styled.TouchableOpacity`
	background-color: ${COLORS.white1};
	align-items: center;
	border-radius: 14px;
	margin: 10px auto;
	padding: 10px;
	width: 30%;
`;
