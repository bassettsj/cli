const ora = require('ora')

const { destroy } = require('../../api/test-profile')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  try {
    const response = await destroy(args)
    if (!args.json)
      spinner.succeed(
        `Test Profile deleted: ${response.name} (${response.uuid})`
      )

    // Return result
    if (args.json) return console.log(JSON.stringify(response, null, 2))
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail(humaniseError(e))
    process.exit(1)
  }
}

module.exports = {
  command: 'delete-test-profile [options]',
  describe: 'Deletes a test profile from a site',
  builder: yargs => {
    yargs
      .options({
        uuid: { demandOption: true, describe: 'The UUID of the test profile' },
        site: {
          demandOption: true,
          describe: 'The identifying slug of a site'
        },
        confirm: {
          describe: 'Confirm the deletion'
        },
        json: { describe: 'Return the test profile attributes as JSON' }
      })
      .check(({ confirm }) => {
        if (process.stdout.isTTY && !confirm)
          return new Error(
            'Add the --confirm flag to confirm the immediate & irreversible deletion of this test profile.'
          )
        return true
      })
  },
  handler: main
}
