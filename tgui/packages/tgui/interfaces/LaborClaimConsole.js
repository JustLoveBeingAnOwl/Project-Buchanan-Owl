import { toTitleCase } from 'common/string';
import { useBackend } from '../backend';
import { Box, Button, LabeledList, Section, Table } from '../components';
import { Window } from '../layouts';

export const LaborClaimConsole = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    can_go_home,
    id_points,
    ores,
    status_info,
    unclaimed_points,
    unclaimed_sentence
  } = data;
  return (
    <Window
      width={315}
      height={440}>
      <Window.Content>
        <Section>
          <LabeledList>
            <LabeledList.Item label="Status">
              {status_info}
            </LabeledList.Item>
            <LabeledList.Item label="Shuttle controls">
              <Button
                content="Move shuttle"
                disabled={!can_go_home}
                onClick={() => act('move_shuttle')} />
            </LabeledList.Item>
            <LabeledList.Item label="Points">
              {id_points}
            </LabeledList.Item>
            <LabeledList.Item
              label="Unclaimed points"
              buttons={(
                <Button
                  content="Claim points"
                  disabled={!unclaimed_points}
                  onClick={() => act('claim_points')} />
              )}>
              {unclaimed_points}
            </LabeledList.Item>
            <LabeledList.Item
              label="Unclaimed sentence reduction"
              buttons={(
                <Button
                  content="Claim Sentence Reduction"
                  disabled={!unclaimed_sentence}
                  onClick={() => act('claim_sentence')} />
              )}>
              {unclaimed_sentence}
            </LabeledList.Item>
          </LabeledList>
        </Section>
        <Section title="Material values">
          <Table>
            <Table.Row header>
              <Table.Cell>
                Material
              </Table.Cell>
              <Table.Cell collapsing textAlign="right">
                Value
              </Table.Cell>
            </Table.Row>
            {ores.map(ore => (
              <Table.Row key={ore.ore}>
                <Table.Cell>
                  {toTitleCase(ore.ore)}
                </Table.Cell>
                <Table.Cell collapsing textAlign="right">
                  <Box color="label" inline>
                    {ore.value}
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </Section>
      </Window.Content>
    </Window>
  );
};
