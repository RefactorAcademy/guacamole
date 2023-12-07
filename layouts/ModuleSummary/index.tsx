import * as React from 'react'
import NumberedBox from '../../components/NumberedBox'
import { ModuleBody, ModuleTitle, ModuleBox } from './style'
import decodeHtml from 'decode-html'

interface ModuleType {
  count?: string
  title: string
  desc: string
}

const ModuleSummary: React.FunctionComponent<ModuleType> = ({
  count = '',
  title = '',
  desc = '',
}) => {
  return title ? (
    <ModuleBox>
      <ModuleTitle
        className="panel-title"
        dangerouslySetInnerHTML={{
          __html: decodeHtml(title),
        }}
      />
      <ModuleBody>{/* <NumberedBox count={count} /> */}</ModuleBody>
      <ModuleBody>
        {desc ? (
          <div
            className="media-body"
            dangerouslySetInnerHTML={{ __html: decodeHtml(desc) }}
          />
        ) : null}
      </ModuleBody>
    </ModuleBox>
  ) : null
}

export default ModuleSummary
