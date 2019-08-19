/**
 * The definitions to define and customize dialogs by declarations.
 * Kinds of dialogs differ from contents as well as styles.
 * Trying to make the styles singleton while the content various.
 */

'use strict';

import * as React from 'react';

type GetUpsertString = (isCreating: boolean) => string

interface IDialogProps {
	fullScreen?: boolean;
}

interface IDialogTitle {
	useTitleBar?: boolean;
	useExitIcon?: boolean;
	title?: string;
	getTitle?: (isCreating: boolean) => string;
}

interface IDialogContent {
	description?: string;
	getDescription?: (isCreating: boolean) => string;
	domDescription?: React.ReactNode;
}

export interface IBaseDialogDefinition extends IDialogProps, IDialogTitle, IDialogContent {}

interface IDialogUpsertAction {
	labelUpsertButton?: string;
	getUpsertButtonLabel?: GetUpsertString;
}

interface IDialogDeleteAction {
	labelDeleteButton?: string;
}

export interface IUpsertDialogDefinition extends IBaseDialogDefinition, IDialogUpsertAction, IDialogDeleteAction {}

export interface IDialogActionButton {
	label: string;
	options?: object;
	onClick: React.MouseEventHandler;
}
