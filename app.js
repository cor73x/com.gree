'use strict';

const Homey = require('homey');
// eslint-disable-next-line no-unused-vars
const { Log } = require('homey-log');

class GreeHVAC extends Homey.App {

    async onInit() {
        this.homeyLog = new Log({ homey: this.homey });
        this.log('Gree HVAC app is up and running...');

        // Register conditions for flows
        this._conditionHVACModeIs = this.homey.flow.getConditionCard('hvac_mode_is')
            .registerRunListener((args, state) => {
                const hvacMode = args.device.getCapabilityValue('thermostat_mode');
                args.device.log('[condition]', '[current hvac mode]', hvacMode);
                return args.mode === hvacMode;
            });

        this._conditionFanSpeedIs = this.homey.flow.getConditionCard('fan_speed_is')
            .registerRunListener((args, state) => {
                const fanSpeed = args.device.getCapabilityValue('fan_speed');
                args.device.log('[condition]', '[current fan speed]', fanSpeed);
                return args.speed === fanSpeed;
            });

        this._conditionTurboModeIs = this.homey.flow.getConditionCard('turbo_mode_is')
            .registerRunListener((args, state) => {
                const turboMode = args.device.getCapabilityValue('turbo_mode');
                args.device.log('[condition]', '[current turbo mode]', turboMode);
                return onoffToBoolean(args.mode) === turboMode;
            });

        this._conditionLightsIs = this.homey.flow.getConditionCard('lights_is')
            .registerRunListener((args, state) => {
                const lightsMode = args.device.getCapabilityValue('lights');
                args.device.log('[condition]', '[current lights]', lightsMode);
                return onoffToBoolean(args.mode) === lightsMode;
            });

        this._conditionXFanModeIs = this.homey.flow.getConditionCard('xfan_mode_is')
            .registerRunListener((args, state) => {
                const xfanMode = args.device.getCapabilityValue('xfan_mode');
                args.device.log('[condition]', '[current xfan mode]', xfanMode);
                return onoffToBoolean(args.mode) === xfanMode;
            });

        this._conditionVerticalSwingIs = this.homey.flow.getConditionCard('vertical_swing_is')
            .registerRunListener((args, state) => {
                const verticalSwing = args.device.getCapabilityValue('vertical_swing');
                args.device.log('[condition]', '[current swing vertical]', verticalSwing);
                return args.vertical_swing === verticalSwing;
            });

        // Register actions for flows
        this._actionChangeHVACMode = this.homey.flow.getActionCard('set_hvac_mode')
            .registerRunListener((args, state) => {
                return args.device.setCapabilityValue('thermostat_mode', args.mode).then(() => {
                    return args.device.triggerCapabilityListener('thermostat_mode', args.mode, {});
                });
            });

        this._actionChangeFanSpeed = this.homey.flow.getActionCard('set_fan_speed')
            .registerRunListener((args, state) => {
                return args.device.setCapabilityValue('fan_speed', args.speed).then(() => {
                    return args.device.triggerCapabilityListener('fan_speed', args.speed, {});
                });
            });

        this._actionChangeTurboMode = this.homey.flow.getActionCard('set_turbo_mode')
            .registerRunListener((args, state) => {
                return args.device.setCapabilityValue('turbo_mode', onoffToBoolean(args.mode)).then(() => {
                    return args.device.triggerCapabilityListener('turbo_mode', onoffToBoolean(args.mode), {});
                });
            });

        this._actionChangeLights = this.homey.flow.getActionCard('set_lights')
            .registerRunListener((args, state) => {
                return args.device.setCapabilityValue('lights', onoffToBoolean(args.mode)).then(() => {
                    return args.device.triggerCapabilityListener('lights', onoffToBoolean(args.mode), {});
                });
            });

        this._actionChangeXFanMode = this.homey.flow.getActionCard('set_xfan_mode')
            .registerRunListener((args, state) => {
                return args.device.setCapabilityValue('xfan_mode', onoffToBoolean(args.mode)).then(() => {
                    return args.device.triggerCapabilityListener('xfan_mode', onoffToBoolean(args.mode), {});
                });
            });

        this._actionChangeVerticalSwing = this.homey.flow.getActionCard('set_vertical_swing')
            .registerRunListener((args, state) => {
                return args.device.setCapabilityValue('vertical_swing', args.vertical_swing).then(() => {
                    return args.device.triggerCapabilityListener('vertical_swing', args.vertical_swing, {});
                });
            });
    }

}

function onoffToBoolean(value) {
    return value === 'on';
}

module.exports = GreeHVAC;
