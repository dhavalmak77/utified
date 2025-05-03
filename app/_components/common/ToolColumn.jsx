'use client';

import { CommonGroup, CopyButton, DownloadButton, QRCode, QRCodeButton, SettingsButton, SubmitButton, UndoRedoButtons, UploadFileButton, UtTextarea, ColumnInputsWrapper, ColumnSettingsWrapper, ToolBoxColumnWrapper } from '@/app/_components/common';

export function ToolColumn({
	isInput,
	label,
	description,
	placeholder,
	value,
	setValue,
	qrValue,
	showQRCode,
	onToggleQRCode,
	settingsVisible,
	onToggleSettings,
	onGenerate,
	onCopy,
	onDownload,
	onUpload,
	autoSync,
	onAutoSyncToggle,
	onUndoRedo,
	error,
	loading,
}) {
	const rows = 5;

	return (
		<ToolBoxColumnWrapper error={error}>
			<ColumnInputsWrapper error={error}>
				<UtTextarea
					label={label}
					description={description}
					rows={rows}
					className={showQRCode && qrValue.length ? 'active-qr' : ''}
					placeholder={placeholder}
					value={value}
					setValue={setValue}
					onChange={(e) => {
						if (autoSync) {
							onGenerate(e.target.value);
						}
						setValue(e.target.value);
					}}
					error={error}
				/>
				{showQRCode && (
					<QRCode
						rows={rows}
						value={qrValue}
						onClick={onToggleQRCode}
					/>
				)}
			</ColumnInputsWrapper>

			<ColumnSettingsWrapper error={error}>
				<CommonGroup justifyBetween>
					<CommonGroup>
						{isInput ? (
							<>
								<SubmitButton
									title='Generate'
									onClick={() => onGenerate(value)}
									loading={loading}
								/>
								<input
									type='checkbox'
									checked={autoSync}
									onChange={(e) => onAutoSyncToggle(e.target.checked)}
								/>
								<span className='ml-2'>Auto Generate</span>
							</>
						) : (
							<UndoRedoButtons
								onUndo={onUndoRedo.undo}
								onRedo={onUndoRedo.redo}
								canUndo={onUndoRedo.canUndo}
								canRedo={onUndoRedo.canRedo}
							/>
						)}
					</CommonGroup>

					<CommonGroup>
						<SettingsButton
							display={settingsVisible}
							onClick={onToggleSettings}
						/>
						<CopyButton
							textToCopy={value}
							disabled={!value}
						/>
						<DownloadButton
							data={value}
							disabled={!value}
							fileExtension='txt'
							fileNamePrefix={isInput ? 'adler32_input' : 'adler32_output'}
						/>
					</CommonGroup>
				</CommonGroup>

				<CommonGroup
					justifyBetween
					hidden={!settingsVisible}
				>
					<CommonGroup>{isInput && <UploadFileButton onChange={onUpload} />}</CommonGroup>
					<CommonGroup>
						<QRCodeButton
							display={showQRCode}
							onClick={onToggleQRCode}
						/>
					</CommonGroup>
				</CommonGroup>
			</ColumnSettingsWrapper>
		</ToolBoxColumnWrapper>
	);
}

export default ToolColumn;