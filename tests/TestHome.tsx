'use strict';

import React, {useState} from 'react';
import {AdvancedTextField} from '../editors/AdvancedTextField';
import {FieldCheckbox} from '../editors/FieldCheckbox';
import {FieldSwitch} from '../editors/FieldSwitch';
import {SimpleEntityEditor} from '../editors/SimpleEntityEditor';
import {SimpleFieldEditor} from '../editors/SimpleFieldEditor';
import {CountdownBySeconds} from '../widgets/CountdownBySeconds';
import {DialogActionButtons} from '../dialogs/DialogActionButtons';
import {DialogConfirmButton} from '../dialogs/DialogConfirmButton';
import {DialogDemoAccount} from './DialogDemoAccount';
import {DemoSection} from './DemoSection';
import {fields as _fields} from './resources';
import {useStyles} from './styles';

const fields = [_fields.name, _fields.email];

interface IProps {

}


const TheTestHome = () => {
	const classes = useStyles();
	const [checkbox, setCheckbox] = useState(false);
	const [patch, setPatch] = useState({});

	const onPatchChange = (patch: object) => {
		console.log('patch changed:', patch);
		setPatch({...patch});
	};

	console.log('checkbox', checkbox, 'patch:', patch);

	return (
		<div className={classes.bodyBox}>
			<DemoSection title={'CountdownBySeconds'}>
				<span>There are <CountdownBySeconds seconds={30}/> seconds left to have supper now!</span>
			</DemoSection>
			<DemoSection title={'DialogActionButtons'}>
				<DialogActionButtons
					buttonContent={'Hello'}
					buttonOptions={{color: 'primary', variant: 'contained'}}
					title={'Would like to have supper?'}
					actions={[{name: 'Okay', onClick: () => console.log('Clicked Okay')}]}
				/>
			</DemoSection>
			<DemoSection title={'DialogConfirmButton'}>
				<DialogConfirmButton
					buttonText={'Go Through'}
					buttonProps={{color: 'primary', variant: 'contained'}}
					onConfirm={() => console.log('confirmed')}
					DialogProps={{
						minWidth: '280px',
						title: 'Have Dinner?',
						labelConfirmButton: 'Okay',
					}}
				/>
			</DemoSection>
			<DemoSection title={'FieldCheckbox'}>
				<FieldCheckbox
					label={'Had a good day?'}
					value={checkbox}
					// @ts-ignore
					onChange={(ele: any, value: boolean): any => setCheckbox(value)}
				/>
			</DemoSection>
			<DemoSection title={'FieldSwitch'}>
				<FieldSwitch
					label={'Had a good day?'}
					labelPlacement={'start'}
					value={checkbox}
					onChange={(ele: any, value: boolean): any => setCheckbox(value)}
				/>
			</DemoSection>
			<DemoSection title={'AdvancedTextField'}>
				<AdvancedTextField
					label={'Last Name'}
					showHelperTextWhenNotFocusing={false}
					placeholder={'What is your last name?'}
					helperText={'Just for a test!'}
				/>
			</DemoSection>
			<DemoSection title={'SimpleFieldEditor'}>
				<SimpleFieldEditor
					id={'name'}
					type={'string'}
					label={'Nick Name'}
					fullWidth={true}
					showHelperTextWhenNotFocusing={false}
					placeholder={'What is your nick name?'}
					helperText={'Just for a test!'}
					onChange={({target: {value}}: any) => onPatchChange({...patch, name: value})}
					value={patch['name'] || ''}
				/>
			</DemoSection>
			<DemoSection title={'SimpleEntityEditor'}>
				<SimpleEntityEditor
					entityFields={fields}
					onPatchChange={onPatchChange}
					targetEntity={{}}
					entityPatch={patch}
					TextField={AdvancedTextField}
				/>
			</DemoSection>
			<DemoSection title={'SimpleEntityEditor'}>
				<DialogDemoAccount/>
			</DemoSection>
		</div>
	);
};

export const TestHome: React.FC<IProps> = React.memo<IProps>(TheTestHome);
