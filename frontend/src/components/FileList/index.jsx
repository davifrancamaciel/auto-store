import React from 'react'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { CircularProgressbar } from 'react-circular-progressbar'

import { Container, FileInfo, Preview } from './styles'

function FileList ({ files, onDelete }) {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{' '}
                {!!uploadedFile.url && (
                  <button onClick={() => onDelete(uploadedFile.id)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 50 },
                  path: { stroke: '#ff8d08' }
                }}
                strokeWidth={10}
                value={uploadedFile.progress / 100}
                maxValue={1}
                text={`${uploadedFile.progress}%`}
                maxValue={1}
              />
            )}

            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <MdLink style={{ marginRight: 8 }} size={40} color='#222' />
              </a>
            )}

            {uploadedFile.uploaded && (
              <MdCheckCircle size={40} color='#78e5d5' />
            )}
            {uploadedFile.error && <MdError size={40} color='#e57878' />}
          </div>
        </li>
      ))}
    </Container>
  )
}

export default FileList
